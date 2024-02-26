package com.posco.invoiceservice.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QInvoiceDataEntity is a Querydsl query type for InvoiceDataEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QInvoiceDataEntity extends EntityPathBase<InvoiceDataEntity> {

    private static final long serialVersionUID = -1466255814L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QInvoiceDataEntity invoiceDataEntity = new QInvoiceDataEntity("invoiceDataEntity");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final QAccountingSlipInvoiceNumEntity accountingSlipInvoiceNum;

    //inherited
    public final StringPath createdBy = _super.createdBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final StringPath depCurr = createString("depCurr");

    public final NumberPath<java.math.BigDecimal> deposit = createNumber("deposit", java.math.BigDecimal.class);

    public final StringPath description = createString("description");

    public final ListPath<EvidenceDataEntity, QEvidenceDataEntity> evidenceDataEntityList = this.<EvidenceDataEntity, QEvidenceDataEntity>createList("evidenceDataEntityList", EvidenceDataEntity.class, QEvidenceDataEntity.class, PathInits.DIRECT2);

    public final NumberPath<Float> exchangeRate = createNumber("exchangeRate", Float.class);

    public final StringPath fiscalMonth = createString("fiscalMonth");

    public final NumberPath<Long> invoiceDataId = createNumber("invoiceDataId", Long.class);

    //inherited
    public final StringPath lastModifiedBy = _super.lastModifiedBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastUpdatedDate = _super.lastUpdatedDate;

    public final NumberPath<Long> ocrId = createNumber("ocrId", Long.class);

    public final StringPath ovsCd = createString("ovsCd");

    public final StringPath status = createString("status");

    public final StringPath store = createString("store");

    public final StringPath tranCd = createString("tranCd");

    public final NumberPath<java.math.BigDecimal> transAmount = createNumber("transAmount", java.math.BigDecimal.class);

    public final DatePath<java.time.LocalDate> txDate = createDate("txDate", java.time.LocalDate.class);

    public final StringPath wdCurr = createString("wdCurr");

    public final NumberPath<java.math.BigDecimal> withdrawal = createNumber("withdrawal", java.math.BigDecimal.class);

    public QInvoiceDataEntity(String variable) {
        this(InvoiceDataEntity.class, forVariable(variable), INITS);
    }

    public QInvoiceDataEntity(Path<? extends InvoiceDataEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QInvoiceDataEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QInvoiceDataEntity(PathMetadata metadata, PathInits inits) {
        this(InvoiceDataEntity.class, metadata, inits);
    }

    public QInvoiceDataEntity(Class<? extends InvoiceDataEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.accountingSlipInvoiceNum = inits.isInitialized("accountingSlipInvoiceNum") ? new QAccountingSlipInvoiceNumEntity(forProperty("accountingSlipInvoiceNum"), inits.get("accountingSlipInvoiceNum")) : null;
    }

}

