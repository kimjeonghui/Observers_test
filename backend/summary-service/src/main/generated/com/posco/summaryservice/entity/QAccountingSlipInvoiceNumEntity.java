package com.posco.summaryservice.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAccountingSlipInvoiceNumEntity is a Querydsl query type for AccountingSlipInvoiceNumEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAccountingSlipInvoiceNumEntity extends EntityPathBase<AccountingSlipInvoiceNumEntity> {

    private static final long serialVersionUID = -950386920L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAccountingSlipInvoiceNumEntity accountingSlipInvoiceNumEntity = new QAccountingSlipInvoiceNumEntity("accountingSlipInvoiceNumEntity");

    public final ListPath<AccountingSlipEntity, QAccountingSlipEntity> accountingSlipEntityList = this.<AccountingSlipEntity, QAccountingSlipEntity>createList("accountingSlipEntityList", AccountingSlipEntity.class, QAccountingSlipEntity.class, PathInits.DIRECT2);

    public final QInvoiceDataEntity invoiceDataEntity;

    public final NumberPath<Long> invoiceDataId = createNumber("invoiceDataId", Long.class);

    public final NumberPath<Long> invoiceNum = createNumber("invoiceNum", Long.class);

    public QAccountingSlipInvoiceNumEntity(String variable) {
        this(AccountingSlipInvoiceNumEntity.class, forVariable(variable), INITS);
    }

    public QAccountingSlipInvoiceNumEntity(Path<? extends AccountingSlipInvoiceNumEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAccountingSlipInvoiceNumEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAccountingSlipInvoiceNumEntity(PathMetadata metadata, PathInits inits) {
        this(AccountingSlipInvoiceNumEntity.class, metadata, inits);
    }

    public QAccountingSlipInvoiceNumEntity(Class<? extends AccountingSlipInvoiceNumEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.invoiceDataEntity = inits.isInitialized("invoiceDataEntity") ? new QInvoiceDataEntity(forProperty("invoiceDataEntity")) : null;
    }

}

